import 'bootstrap/scss/bootstrap.scss'
import {useState,useEffect} from 'react'
import './App.sass'

function App() {
	const [contries, setContries] = useState([]);
	const [word, setWord] = useState('');
	const [dataFilter] = useState(["name","capital","region"]);

	useEffect(()=>{
		fetch('https://restcountries.com/v2/all')
		.then(res=>res.json())
		.then(data=>{
			setContries(data)
		})
	}
	,[])

	const searchCount=(contries)=>{
		return contries.filter((item =>{
			return dataFilter.some((filter)=>{
				if(item[filter]){
					return item[filter].toString().toLowerCase().indexOf(word.toLowerCase())>-1
				}
			})
		}))

	}
	const formatNumber=(num)=> {
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
	}
	

	return (
		<div className="container-lg">
			<div className="py-3">
				<h1>ค้นหาข้อมูลประเทศ</h1>
				<div className="mb-3">
					
					<input 
						type="text" 
						className="form-control"  
						placeholder="ค้นหาข้อมูลประเทศ"
						value={word}
						onChange={(e)=>setWord(e.target.value)}
						/>
				</div>
				<ul className='list-conuntries'>
					{searchCount(contries).map((item,index)=>{
						return (
							<li className='item' key={index}>
								<div className="thumbnail">
									<img src={item.flags.png} alt={item.name} height='120'/>
								</div>
								<div className="p-2">
								<h5>{item.name}</h5>
									<ol>
										<li>เมืองหลวง : <span>{item.capital}</span></li>
										<li>ภูมิภาค : <span>{item.region}</span></li>
										<li>ประชากร : <span>{formatNumber(item.population)}</span></li>
																
									</ol>
								</div>
								
							
							</li>
						)
					})}
				</ul>
				</div>
		</div>
	);
}

export default App;
