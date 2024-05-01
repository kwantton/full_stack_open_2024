const Message = ({message}) => {
    const messageStyle = {    
        color: 'grey',    
        fontStyle: 'italic',    
        fontSize: 16,
        height: 20 } // thanks to this, constant height is maintained c: https://reactnative.dev/docs/height-and-width
        //display:'inline-block'  }    // doesn't work
    return (
        <div style={messageStyle}>
          <p>{message}</p>
        </div>
        )
}

export default Message