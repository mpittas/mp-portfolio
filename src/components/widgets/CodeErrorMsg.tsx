type CodeErrorMsgProps = {
  children?: React.ReactNode
}

export default function CodeErrorMsg({
  children = "Error message goes here",
}: CodeErrorMsgProps) {
  return (
    <div className="header py-1 bg-red-100 text-red-700 ">
      <div className="container">
        <h1 className="text-sm ">{children}</h1>
      </div>
    </div>
  )
}
