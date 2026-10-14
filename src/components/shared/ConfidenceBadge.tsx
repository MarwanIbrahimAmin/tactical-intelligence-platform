import React from 'react';
import { Confidence } from '../../types/tactical';
import { ShieldCheck, ShieldAlert, ShieldQuestion } from 'lucide-react';

interface ConfidenceBadgeProps {
  confidence: Confidence;
}

const config: Record<Confidence, { className: string; icon: React.ReactNode; label: string }> = {
  High: {
    className: 'badge badge--confidence-high',
    icon: <ShieldCheck size={12} />,
    label: 'High confidence',
  },
  Medium: {
    className: 'badge badge--confidence-medium',
    icon: <ShieldAlert size={12} />,
    label: 'Medium confidence',
  },
  Low: {
    className: 'badge badge--confidence-low',
    icon: <ShieldQuestion size={12} />,
    label: 'Low confidence',
  },
};

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ confidence }) => {
  const c = config[confidence];
  return (
    <span className={c.className}>
      {c.icon}
      {c.label}
    </span>
  );
};
