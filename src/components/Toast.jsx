import React from 'react';
import { useToast } from '../context/ToastContext';

export default function Toast() {
  const { toasts, removeToast } = useToast();

  if (!toasts || toasts.length === 0) return null;

  const getTypeStyle = (type) => {
    switch (type) {
      case 'success':
        return 'bg-success text-white';
      case 'warning':
        return 'bg-warning text-dark';
      case 'danger':
        return 'bg-danger text-white';
      default:
        return 'bg-primary text-white';
    }
  };

  return (
    <div className="toast-container-custom">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast show align-items-center mb-2 border-0 shadow-lg ${getTypeStyle(t.type)}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{ borderRadius: '12px', minWidth: '280px' }}
        >
          <div className="d-flex">
            <div className="toast-body font-weight-bold d-flex align-items-center gap-2">
              <i className="bi bi-info-circle-fill fs-5"></i>
              <span>{t.message}</span>
            </div>
            <button
              type="button"
              className="btn-close me-2 m-auto"
              style={{ filter: t.type === 'warning' ? 'none' : 'invert(1)' }}
              onClick={() => removeToast(t.id)}
              aria-label="Close"
            ></button>
          </div>
        </div>
      ))}
    </div>
  );
}
