// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

const STATUSES = [
  { key: 'processing', label: 'En preparación' },
  { key: 'shipped', label: 'Enviados' },
  { key: 'delivered', label: 'Entregados' },
  { key: 'archived', label: 'Archivados' },
];

export default function AdminOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [activeStatus, setActiveStatus] = useState('processing');
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  useEffect(() => {
    const protect = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user || data.user.email !== adminEmail) {
        router.replace('/login');
        return;
      }
      loadOrders();
    };
    protect();
  }, []);

  const loadOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    setOrders(data || []);
  };

  const updateStatus = async (orderId, status) => {
    await fetch('/api/admin/ship-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, status }),
    });
    loadOrders();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
  };

  const nextAction = {
    processing: { label: 'Marcar enviado', next: 'shipped' },
    shipped: { label: 'Marcar entregado', next: 'delivered' },
    delivered: { label: 'Archivar', next: 'archived' },
  };

  const visibleOrders = orders.filter(
    (o) => o.status === activeStatus
  );

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 16 }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <h1 style={{ fontSize: 22 }}>Panel de pedidos</h1>

        <button
          onClick={handleLogout}
          style={{
            padding: '8px 12px',
            borderRadius: 6,
            background: '#ef4444',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontSize: 13,
          }}
        >
          Cerrar sesión
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {STATUSES.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveStatus(s.key)}
            style={{
              padding: '8px 12px',
              borderRadius: 6,
              border: '1px solid #ddd',
              background:
                activeStatus === s.key ? '#111827' : '#fff',
              color:
                activeStatus === s.key ? '#fff' : '#000',
              cursor: 'pointer',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Orders */}
      {visibleOrders.length === 0 ? (
        <p>No hay pedidos en este estado.</p>
      ) : (
        visibleOrders.map((order) => (
          <div
            key={order.id}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              padding: 16,
              marginBottom: 12,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <strong>{order.email}</strong>
              <div style={{ fontSize: 13, color: '#555' }}>
                Pedido {order.id.slice(0, 8)} · {order.amount} {order.currency}
              </div>
            </div>

            {nextAction[order.status] && (
              <button
                onClick={() =>
                  updateStatus(order.id, nextAction[order.status].next)
                }
                style={{
                  padding: '8px 12px',
                  borderRadius: 6,
                  background: '#111827',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {nextAction[order.status].label}
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
