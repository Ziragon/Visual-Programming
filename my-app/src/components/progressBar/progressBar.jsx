import React from 'react'
import cl from './progressBar.module.css'

const ProgressBar = ({ title, progress, onCancel }) => {
    return (
      <div className={cl.block}>
        <p className='text'>{title}</p>
        <div className={cl.progress_bar}>
          <progress value={progress} max="100" className={cl.progress_value}/>
          <p>{progress}%</p>
        </div>
        <button 
          onClick={onCancel}
          className={cl.button}
        >Cancel</button>
      </div>
    );
  };

  export default ProgressBar