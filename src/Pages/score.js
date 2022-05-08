const Score=(props)=>{
    const{score, miniMark}=props;
   
    return(
        <div className="container mt-5 text-center" id={score>miniMark*5 ?"score":"score1"}>
            <h1>Your Score is {score}</h1>
        </div>
    )
}

export default Score;