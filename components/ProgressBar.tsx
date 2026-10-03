interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-xs text-gray-500">
        <span>Reading progress</span>
        <span>{progress}%</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-[#D8C7A3]/40">
        <div
          className="h-full rounded-full bg-[#355E3B]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}