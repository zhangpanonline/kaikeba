import React, { useState, useEffect } from 'react'

export default function FnComponent(props) {
  const [ date, setDate ] = useState(new Date())

  useEffect(() => {
    // 相当于componentDidMount、componentDidUpdate、
    // componentWillUnmount 的集合
    const timer = setInterval(() => {
      setDate(new Date())
    }, 1000)
    console.log(timer)
    return () => clearInterval(timer) // 组件卸载执行
  }, [])

  return (
    <div>
      <hr/>
      <h1>FunctionComponent</h1>
      <p>{date.toLocaleString()}</p>
    </div>
  )
}