interface PlaceholderCardProps {
  title: string;
  subtitle: string;
}

export default function PlaceholderCard({ title, subtitle }: PlaceholderCardProps) {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm flex flex-col items-center justify-center text-center h-56">
      <div className="text-gray-300 text-5xl mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 11V6h6M5 12h14M6 16h.01M6 20h.01M10 16h.01M10 20h.01M14 16h.01M14 20h.01" />
        </svg>
      </div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-xs text-gray-400">{subtitle}</p>
    </div>
  );
}
