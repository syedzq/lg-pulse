interface ProgressBarProps {
    progress: number;  // Decimal between 0 and 1
    className?: string;
}

export function ProgressBar({ progress, className }: ProgressBarProps) {
    // Ensure progress is between 0 and 1
    const clampedProgress = Math.min(Math.max(progress, 0), 1);
    const percentage = Math.round(clampedProgress * 100);
    
    return (
        <div className={`w-full h-1 bg-neutral-100 rounded-full overflow-hidden ${className}`}>
            <div 
                className="h-full bg-brand-500 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${percentage}%` }}
            />
        </div>
    );
} 