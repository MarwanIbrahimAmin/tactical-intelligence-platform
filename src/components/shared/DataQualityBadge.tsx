import React from 'react';
import { DataQuality } from '../../types/tactical';
import { CheckCircle2, AlertTriangle } from 'lucide-react';

interface DataQualityBadgeProps {
  quality: DataQuality;
}

export const DataQualityBadge: React.FC<DataQualityBadgeProps> = ({ quality }) => {
  if (quality === 'OK') {
    return (
      <span className="badge badge--quality-ok">
        <CheckCircle2 size={12} />
        Data OK
      </span>
    );
  }

  return (
    <span className="badge badge--quality-uncertain">
      <AlertTriangle size={12} />
      Uncertain
    </span>
  );
};
