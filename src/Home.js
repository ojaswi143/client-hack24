import React , { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [fileType, setFileType] = useState('survey');
  const [textInput, setTextInput] = useState(''); 
  
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.log('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const repository = 'https://github.com/ojaswi143/test'; // Update with your repository link
    formData.append('repository', repository);
    //const isQ = 'no'
    const isQ = ( fileType=='questions')?'yes': 'no'
    formData.append('isQ', isQ);

    try {
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });

      console.log('File selected', formData);
      if (response.ok) {
        console.log('File uploaded successfully!');
      }
      else if(response.status==500){
        console.log("File already exists")
      } else {
        console.error('Failed to upload file.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleSubmitText = () => {
    // Logic to handle the submission of text input
    console.log('Text submitted:', textInput);
    // You can perform further processing with the submitted text here
  };


  

  return (
    <div className="app" >
      <br></br>
      <br></br>
      <h2>Welcome to</h2>
      <h3>EGS Survey portal of</h3>
      <h2>WELLS FARGO</h2>
      <img src="https://www.simtrade.fr/blog_simtrade/wp-content/uploads/2022/11/img_Wells_Fargo_logo.png" alt="Example Image" className="image"/>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      
      <div>
        <label htmlFor="fileType" className='labels'>Select: </label>
        <select id="fileType" value={fileType} onChange={(e) => setFileType(e.target.value)} 
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '25px', marginRight: '8px' }}>
          <option value="survey" className='options' >Survey Data</option>
          <option value="questions" className='options'>Questions</option>
          <option value="text" className='options'>Add link</option>
        </select>
        <br />
        <br />
        {fileType === 'text' && (
          <div>
            <input type="text" value={textInput} onChange={(e) => setTextInput(e.target.value)} className='textlink' style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginRight: '8px', width: '200px' }}/>
            <button onClick={handleSubmitText} style={{ padding: '8px 16px', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Submit</button>
          </div>
        )}
        {fileType !== 'text' && <div style={{ position: 'relative', display: 'inline-block', overflow: 'hidden' }}>
            <input
              type="file"
              onChange={handleFileUpload}
              style={{
                position: 'absolute',
                fontSize: '100px',
                right: '0',
                top: '0',
                opacity: '0',
                cursor: 'pointer'
              }}
            />
            <button
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                fontFamily: 'Arial, sans-serif'
              }}
            >
              Choose File
            </button>
            <span id="fileName" style={{ marginLeft: '8px', fontFamily: 'Arial, sans-serif', fontStyle: 'italic' }}>No file chosen</span>
          </div>
        }
      </div>
    
    </div>
  );
};

export default Home;