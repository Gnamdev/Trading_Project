<section className="absolute bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2">
  {/* for chat space  */}

  {isBotRealease && (
    <div
      className="rounded-md w-[20rem] md:w-[25rem] lg:w-[25] h-[75vh] bg-slate-900
"
    >
      <div className="flex justify-between items-center border-b px-6 h-[12%]">
        <p>Chat Bot </p>
        <Button
          onClick={handleBotRealease}
          variant="ghost"
          size="icon"
          className=""
        >
          <Cross1Icon />
        </Button>
      </div>

      <div className="h-[76%] flex-col flex overflow-y-auto gap-5 py-2 scroll-container">
        <div className="self-start pb-5 px-2 py-2">
          <div className="justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto">
            <p>Hi , I'm chat Bot</p>
            <p>you can ask me crypto related any qustion </p>
            <p>like , pprice , market cap extra ...</p>
          </div>
        </div>

        {[1, 1, 1, 1, 1].map((item, i) => (
          <div
            key={i}
            className={`   
    ${i % 2 == 0 ? "self-start " : "self-end"} pb-5 px-2 py-2"`}
          >
            {i % 2 == 0 ? (
              <div className="justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto">
                <p>{item.message}</p>
              </div>
            ) : (
              <div className="justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto">
                <p>{chatHistory}</p>
              </div>
            )}
            {item.loading ? "fetch" : ""}
          </div>
        ))}
      </div>

      <div className="h-[12%] border-t">
        <Input
          className="w-full h-full order-none outline-none"
          placeholder="write prompt here .."
          onChange={handlerchange}
          value={inputValue}
          onKeyPress={handlerKeyPress}
        />
      </div>
    </div>
  )}

  <div className="relative  w-[10rem] cursor-pointer group">
    <Button
      onClick={handleBotRealease}
      className="w-full h-[3rem] gap-2 items-center "
    >
      <MessageCircle
        className="fill-[#1e293b] -rotate-90 stroke-none group-hover:fill-[#1a1a1a]"
        size={30}
      />
      <span className="text-2xl">Chat Bot</span>
    </Button>
  </div>
</section>;
