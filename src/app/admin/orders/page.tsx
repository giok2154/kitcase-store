// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    setOrders(data || []);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const markAsShipped = async (orderId) => {
    await fetch('/api/admin/ship-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId }),
    });

    loadOrders();
  };

  const statusBg = (status) => {
    if (status === 'processing') return '#FEF3C7';
    if (status === 'shipped') return '#DCFCE7';
    return '#E5E7EB';
  };

  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', padding: '0 16px' }}>
      <h1 style={{ fontSize: '22px', marginBottom: '20px' }}>
        Panel Admin · Pedidos
      </h1>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ddd', textAlign: 'left' }}>
            <th>ID</th>
            <th>Email</th>
            <th>Importe</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px 0' }}>
                {order.id.slice(0, 6)}…
              </td>

              <td>{order.email}</td>

              <td>
                {order.amount} {order.currency}
              </td>

              <td>
                <span
                  style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    background: statusBg(order.status),
                  }}
                >
                  {order.status}
                </span>
              </td>

              <td>
                {order.status === 'processing' && (
                  <button
                    onClick={() => markAsShipped(order.id)}
                    style={{
                      padding: '6px 10px',
                      background: '#111827',
                      color: '#ffffff',
                      borderRadius: '6px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      border: 'none',
                    }}
                  >
                    Marcar enviado
                  </button>
                )}
              </td>
            </tr>
          ))}

          {orders.length === 0 && (
            <tr>
              <td colSpan={5} style={{ padding: '20px', textAlign: 'center' }}>
                No hay pedidos
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
