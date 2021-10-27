import '../cssPages/History.css';
import firebase from './firebase';
import React,{useState, useEffect} from 'react';
import picture from '../background/Picture2.PNG';
import {Form, Button, Card, Alert, DropdownButton, Dropdown} from 'react-bootstrap';
const useItems = () => {
    const [items, setItems] = useState([]); //useState() hook, sets initial state to an empty array
    useEffect(() => {
      const unsubscribe = firebase
        .firestore() //access firestore
        .collection("report_history").orderBy("timestamp","desc") //access "items" collection
        .onSnapshot(snapshot => {
          //You can "listen" to a document with the onSnapshot() method.
          const listItems = snapshot.docs.map(doc => ({
            //map each document into snapshot
            id: doc.id, //id and data pushed into items array
            ...doc.data() //spread operator merges data to id.
          }));
          setItems(listItems); //items is equal to listItems
        });
      return () => unsubscribe();
    }, []);
    return items;
  };

  const ItemList = ({ editItem }) => {
    const listItem = useItems();
    const [searchTerm, setSearchTerm] = useState("")
    return (
      <div className="history">
        
       {/* <input 
        className="search"
        type="text" 
        placeholder="Search..."
        onChange={(event) => {setSearchTerm(event.target.value);
        }}
      />*/}
      

     
        <Form>
          <br/>
        <Form.Control type ="text" placeholder="Search" style={{padding:'10px',borderRadius:'6px',width:'30%',
        marginLeft:'5vw'}}onChange={(event) => {setSearchTerm(event.target.value); }}/> 
        </Form>



 <div className="table-box">
        <table className="tg">
            <thead>
                <tr>
                    <th>Resident Name</th>
                    <th>Address</th>
                    <th>Time of Report</th>
                    <th>Contact no.</th>
                    <th>Incidents</th>
                    <th>Timestamp</th>
                    <th>Email</th>
                </tr>
            </thead>
            {listItem.filter((val) =>{
                if(searchTerm == ""){
                    return val
                } 
                  else if ((val.residentname||'').toLowerCase().includes(searchTerm.toLowerCase())
                          ||(val.address||'').toLowerCase().includes(searchTerm.toLowerCase())
                          ||(val.timeofreport||'').toLowerCase().includes(searchTerm.toLowerCase())
                          ||(val.contact||'').toLowerCase().includes(searchTerm.toLowerCase())
                          ||(val.incident||'').toLowerCase().includes(searchTerm.toLowerCase())
                          ||(val.timestamp||'').toLowerCase().includes(searchTerm.toLowerCase())
                          ||(val.email||'').toLowerCase().includes(searchTerm.toLowerCase())
                          ){
                    return val
                }
            }
            ).map(item => (
                <tbody key={item.id}>
                    <tr>
                        <td className="tg-ycr8" >{item.residentname}</td>
                        <td className="tg-ycr8">{item.address}</td>
                        <td className="tg-i81m">{item.timeofreport}</td>
                        <td className="tg-a02x">{item.contact}</td>
                        <td className="tg-a02x">{item.incident}</td>
                        <td className="tg-a02x">{item.timestamp}</td>
                        <td className="tg-a02x">{item.email}</td>

                    </tr>
                </tbody>
            ))}
        </table>
        </div>
        </div>
       
      
    );
  };
  export default ItemList;
