type ClickCounterProps = {
  count: number;
};

export const ClickCounter = ({ count }: ClickCounterProps) => {
  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="px-10 py-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-white">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-semibold text-gray-600 tracking-wide uppercase">
            クリック回数
          </span>
          <div className="flex items-baseline gap-2">
            <span>{count}</span>
            <span className="text-3xl font-bold text-gray-700">回</span>
          </div>
        </div>
      </div>
    </div>
  );
};
