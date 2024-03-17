import React , { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [fileType, setFileType] = useState('survey');
  const [textInput, setTextInput] = useState(''); 
  const [showTextInput, setShowTextInput] = useState(false); 

  // const handleFileUpload = async (event,isQues) => {
  //   const file = event.target.files[0];
  //   if (!file) {
  //     console.log('No file selected');
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('file', file);

  //   const repository = 'https://github.com/ojaswi143/test'; // Update with your repository link
  //   formData.append('repository', repository);
  //   const isQ = 'no'
  //   //const isQ = ( fileType=='questions')?'yes': 'no'
  //   formData.append('isQ', isQues);

  //   try {
  //     const response = await fetch('http://localhost:8000/upload', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     console.log('File selected', formData);
  //     if (response.ok) {
  //       console.log('File uploaded successfully!');
  //     }
  //     else if(response.status==500){
  //       console.log("File already exists")
  //     } else {
  //       console.error('Failed to upload file.');
  //     }
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //   }
  // };

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
      <h1>Welcome to</h1>
      {/* <h2>to the </h2> */}
      <h2>WELLS FARGO BANKING</h2>
      <img src="https://www.simtrade.fr/blog_simtrade/wp-content/uploads/2022/11/img_Wells_Fargo_logo.png" alt="Example Image" className="image"/>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {/* <div>
      <h3>Upload Survey data</h3>
      <input type="file" onChange={(e) => handleFileUpload(e, 'no')} />

      <h3>Upload Questions</h3>
      <input type="file" onChange={(e) => handleFileUpload(e, 'yes')} />
    </div> */}

    {/* <div>
        <label htmlFor="fileType">Select file type:</label>
        <select id="fileType" value={fileType} onChange={(e) => setFileType(e.target.value)}>
          <option value="survey">Survey Data</option>
          <option value="questions">Questions</option>
        </select>
        <br />
        <br />
        <input type="file" onChange={handleFileUploadd} />
      </div> */}
      <div>
        <label htmlFor="fileType">Select file type:</label>
        <select id="fileType" value={fileType} onChange={(e) => setFileType(e.target.value)}>
          <option value="survey">Survey Data</option>
          <option value="questions">Questions</option>
          <option value="text">Add link</option>
        </select>
        <br />
        <br />
        {fileType === 'text' && (
          <div>
            <input type="text" value={textInput} onChange={(e) => setTextInput(e.target.value)} />
            <button onClick={handleSubmitText}>Submit</button>
          </div>
        )}
        {fileType !== 'text' && <input type="file" onChange={handleFileUpload} />}
      </div>
    
    </div>
  );
};

export default Home;