import styled from "styled-components";

export const root = styled.div`
  background: #e6e6e6;
  display: flex;
  // height:30vh;
`;

export const div = styled.div`
  margin-left: 13rem;
`;

export const NavMenu = styled.div`
background-color: white;
width: 15%;
position: fixed;
margin-top:5rem;
p{
    background-color:white;
    padding-top:0.5rem;
    padding-bottom: 0.5rem;   
    padding-left: 1rem;
    margin:auto; 
    // border-style: outset;
    position: relative;
    transition: all 1s ease;
    
    &:hover {
        // border-style: inset;
        background-color:rgb(94, 94, 94);
        color:white;
        padding-left: 5rem;
        margin-left: 20px;
        
      },
}
`;

export const addSellForm = styled.div`
  margin-top: 5rem;
  margin-bottom: 2rem;
  height: auto;
  padding-top: 2rem;
  background-color: white;
  p {
    display: flex;
    justify-content: center;
  }
`;

export const part = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 3rem;
  margin-top: 1rem;
  align-items: center;
  .title {
    width: 30rem;
    margin-right: 6rem;
  }
  .Description {
    width: 30rem;
    height: 10rem;
    border-color: blue;
    z-index: -0;
    margin-right: 6rem;
  }

  .category {
    margin-right: 6rem;
    width: 30rem;
  }
  .Price {
    margin-right: 6rem;
    width: 30rem;
  }
  .UsedDuration {
    margin-right: 6rem;
    width: 30rem;
  }
  .contactNumber {
    margin-right: 6rem;
    width: 30rem;
  }
  .Email {
    margin-right: 6rem;
    width: 30rem;
  }
  .location {
    margin-right: 6rem;
    width: 30rem;
  }
  .addbutton {
    margin-left: 7.9rem;
    margin-bottom:1rem;
  }
`;