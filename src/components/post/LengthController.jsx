import { useEffect } from "react"


export default function LengthController(props) {
	useEffect(() => {
		//console.log(props.current)
	}, [props])

	return (
		<div className="input-length-controller">{props.current}/{props.maxLength}</div>
	)
}