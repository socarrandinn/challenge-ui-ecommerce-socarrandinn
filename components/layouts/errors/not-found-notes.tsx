'use client';
import { CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const NotFoundNotes = () => {
  const { t } = useTranslation('errors');
  const notes = t('notFound.note.notes', { returnObjects: true }) as string[];
  return (
    <div className="flex flex-col gap-2">
      {notes?.map((note) => (
        <div key={note} className="flex items-start gap-3 text-left text-sm">
          <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
          {note}
        </div>
      ))}
    </div>
  );
};

export default NotFoundNotes;
