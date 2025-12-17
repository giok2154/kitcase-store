'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    setOrders(data || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase
      .from('orders')
      .update({ status })
      .eq('id', id);

    loadOrders();
  };

  if (loading) return <p>Cargando pedidos...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Panel Admin · Pedidos</h1>

      <table border={1} cellPadding={8} style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Importe</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id.slice(0, 8)}</td>
              <td>{order.email}</td>
              <td>{order.amount} {order.currency}</td>
              <td>{order.status}</td>
              <td>
                {order.status === 'processing' && (
                  <button onClick={() => updateStatus(order.id, 'shipped')}>
                    Marcar enviado
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
