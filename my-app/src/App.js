import React from 'react';
import './App.css';
import Speech from './component/speech';

     const fetchCat = async (text) => {
            const OPEN_API_DOMAIN = "https://cataas.com";
            const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
            //fetch API를 사용하여 이 도메인에 입력한 대사를 json으로 받아오라는 뜻.
            const responseJson = await response.json();
            
            return `${OPEN_API_DOMAIN}/${responseJson.url}`;
        };
        //await는 .then기능이랑 똑같음
        //Open API를 받아오는 함수.

    const Form = ({onUpdate})=>{
        const includesHangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i.test(text);
        const [value, setValue] = React.useState('');
        const [errorMessage, setErrorMessage] = React.useState('');
        
        
        const translate = (e)=>{
            const userValue = e.target.value; //input값이 저장되는 이벤트객체의 속성위치를 변수 지정.
            setErrorMessage("") //함수가 호출될 때 마다 초기값을 지정해줘야 된다.
            
            if(includesHangul(userValue)){
                setErrorMessage("You cannot input Korean!");
            }
            setValue(userValue.toUpperCase()); //소문자를 대문자로 변경.
        }

        const create = (e)=>{
            e.preventDefault();
            setErrorMessage("")
            if(value === ""){
                setErrorMessage("It cannot be submitted with an empty value!")
                return; //return을 작성을 안하면 빈값일 때도 onUpdate(value)함수가 실행이 되기 때문에 꼭 return 작성.
            }
            onUpdate(value);
        }

        return(
            <form onSubmit={create}>
                <input
                style={{paddingLeft:'10px',width:'420px',height:'30px',fontSize:'15px',borderRadius:'30px',backgroundColor:'white'}} 
                className = "input_style"
                type ="text"
                placeholder="Please enter English language."
                value={value}
                onChange ={translate}
                />
                <button className ="search_button">Create</button>
                <p style={{color:"red",fontWeight:"bold"}}>{errorMessage}</p>
            </form>
        )
    }

        const MainCard = ({img,onHeartClick,alreadyFavorite})=>{

            const heartIcon = alreadyFavorite ? "💖" : "🤍";
            return(
                <div className="main-card">
                    <img
                        src = {img}
                        width = "260"
                    />
                    <button onClick={onHeartClick}>{heartIcon}</button>
                </div>
            )
        }
        
        const Item = (props)=>{
            return(
                <li>
                    <img src={props.img} style={{ width: '140px' }} />
                </li>
            )
        }

        const Footer = ({list})=>{
            if(list.length ===0){
                return(
                    <div className="footer">
                        <h2 style={{fontWeight:"bold",paddingTop:"30px"}}>
                            Click the heart to add the picture you want!
                        </h2>                    
                    </div>
                )
            }

            return(
                <div className="footer">
                    <ul className="Item">
                        {
                            list.map((value,index)=>(
                                <Item img={value} key={index} />
                            ))
                        }
                    </ul>
                </div>
            )
        }

function App() {
        const Loading = "https://thumbs.gfycat.com/DearWellinformedDalmatian-size_restricted.gif"
        const [counter,setCounter] = React.useState(0)
        const [list, setList] = React.useState([]);
        const [mainCat,setMainCat] = React.useState(Loading);
        
// ---------------------------------------------------------------------------
        async function setInitialCat(){
            const newCat = await fetchCat('first Cat')
            setMainCat(newCat);
        }

        React.useEffect(()=>{
            setInitialCat();
        },[])
        //setInitialCat() 함수가 한번만 실행되게 useEffect로 감싸주었다.
// ---------------------------------------------------------------------------
        const handleHeartClick = ()=>{
            setList([...list,mainCat]);
        }
        //첫번째 handleHearClick 함수가 실행되면 mainCat에는 Loading 이미지가 mainCat이 된다.
        //두번째 setInitialCat() 함수에 fetchCat 비동기 함수가 실행되어 mainCat 이미지는 'firtst Cat'을 텍스트 문구로 한 이미지 데이터가 얻게된다.

        async function update(value){
            const main_img = await fetchCat(value);
            setMainCat(main_img);
            setCounter(counter + 1)
        }
        const alreadyFavorite = list.includes(mainCat);
  return (
      <div>
          <Speech counter={counter} />
            <div className="main">
                <h1 style={{fontSize:'110px',marginBottom:'30px'}}>CAT Background</h1>
                <Form onUpdate={update} />
                <MainCard img={mainCat} onHeartClick={handleHeartClick} alreadyFavorite={alreadyFavorite} />
            </div>
                <Footer list={list} />
            </div>
  );
}

export default App;
