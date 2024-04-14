import React from 'react'

type statusImageProps  = {
    statusMessage : string;
    statClassName? : string;
}
const StatusMessage : React.FC<statusImageProps> = ({statusMessage, statClassName}) => {
  return (
    <div>
        <p className={statClassName}>{statusMessage}</p>
    </div>
  )
}

export default StatusMessage