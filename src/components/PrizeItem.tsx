import type { FC } from "react"

const imgArray = ['GoldCup.png', 'SilverCup.png', 'BronceCup.png']
const placeText = ['1er Lugar', '2do Lugar', '3er Lugar']
const prizeArray = ['$1000', '$300', '$200']
interface PrizeItemProps {
    position: number,
}


const PrizeItem:FC<PrizeItemProps> = ({position})=>{
const imgUri = `./assets/${imgArray[position]}`

return <div className="flex-col">
    <img src={imgUri} alt="Prize" className="z-10"/>
    <div className="relative z-0 flex-col bg-amber-100 rounded-2xl h-80 transform -translate-y-75 " >
        {placeText[position]}<br/>
        {prizeArray[position]} 
    </div>
</div>
}

export default PrizeItem;