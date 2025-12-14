interface TimelineItemType {
  text: string
  date: string
  category: { tag: string; color?: string; bgColor: string }
  link?: { url: string; text: string }
  year: number
}

const TimelineItem = ({ data }: { data: TimelineItemType }) => {
  let {
    date,
    text,
    link,
    category: { tag, color, bgColor },
  } = data

  return (
    <div className="group relative my-[10px] flex w-1/2 justify-end pr-[22px] odd:justify-start odd:self-end odd:pl-[22px] odd:pr-0 sm:pr-[30px] sm:odd:pl-[30px]">
      <div className="relative flex w-full max-w-[95%] flex-col rounded-xl bg-white p-6 shadow-md border border-slate-100 after:absolute after:right-[-8px] after:top-[calc(50%-8px)] after:h-4 after:w-4 after:rotate-45 after:bg-white after:border-t after:border-r after:border-slate-100 group-odd:after:left-[-8px] group-odd:after:right-auto group-odd:after:border-t-0 group-odd:after:border-r-0 group-odd:after:border-b group-odd:after:border-l md:max-w-md">
        <span
          className="inline-block px-3 py-1 mb-3 text-xs font-bold uppercase tracking-wider rounded-md w-fit self-end group-odd:self-start"
          style={{ backgroundColor: bgColor, color: color ? color : '#7c2d12' }}
        >
          {tag}
        </span>
        <time className="block text-sm font-semibold text-slate-500 mb-2 text-right group-odd:text-left">{date}</time>
        <p className="text-slate-700 leading-relaxed text-right group-odd:text-left">{text}</p>
        {link && (
          <a
            href={link.url}
            className="text-sm text-[rgb(160,160,160)] underline after:ml-0.5 after:hidden after:text-xs after:content-['►'] md:no-underline md:after:inline-block"
            target="_blank"
            rel=""
          >
            {link.text}
          </a>
        )}
        <span className="absolute -right-[42px] top-[calc(50%-8px)] h-4 w-4 rounded-full border-[3px] border-orange-500 bg-white shadow-sm ring-4 ring-white transition-all group-hover:scale-125 group-odd:-left-[42px] group-odd:right-auto sm:-right-[52px] sm:group-odd:-left-[52px]" />
      </div>
    </div>
  )
}

export default TimelineItem