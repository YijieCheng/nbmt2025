export interface Stat {
  value: string;
  label: string;
}

export interface EventData {
  id: string;
  year: string;
  dateRange?: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  stats?: Stat[];
  themeColor: string; // Tailwind color class stub
  align: 'left' | 'right';
}