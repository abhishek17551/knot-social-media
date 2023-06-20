export const postCardStyle = {
    paddingX : '2',
    paddingY : '2',
    marginY : '4',
    marginX : '1', 
    flexDirection : 'column',
    borderRadius : 'lg',
    height : 'fit-content'
}

export const displayCardStyle = {
    position : 'relative',
    boxShadow: 'rgb(0 0 0 / 5%) 0px 0px 10px 4px',
    width : { base: "90vw", md: "85%", lg: "30rem" },
    marginTop : '4',
}

export const sidebarStyle = {
    flexDirection : "column",
    fontSize : "1.25rem",
    borderRight : "1px",
    width : { md: "5rem", lg: "15rem" },
    display : { base: "none", md: "block" },
};

export const fontAwesomeIconStyle = {
    cursor : "pointer",
    fontSize : "1.25rem",
    marginRight : "1rem",
}

export const flexMiddleOuterContainerStyle = {
    width : "100%",
    flexGrow : "1",
    justifyContent: {
      base: "center",
      md: "space-between",
    }
};

export const flexMiddleContainerStyle = {
    flexDirection : "column",
    alignItems : "center",
    flexGrow : "1",
    width : { base: "100%", md: "40%", lg: "62.5%" },
};

export const suggestionContainerStyle = {
    flexDirection : "column",
    paddingRight : "4",
    paddingLeft : "4",
    height : "calc(100vh - 3rem)",
    width: "18rem",
    paddingY : "4",
    position : "sticky",
    right : "4",
    top : "3rem",
    borderLeft : "1px",
    display : { base: "none", md: "block" },
    "overflow-y": "scroll",
};

export const sortButtonsContainerStyle = {
    position : "sticky",
    top : "3.2rem",
    zIndex : "7",
    width : "96vw",
    justifyContent : "space-around",
    alignItems : "center",
    height : "2.5rem",
    padding : "5px",
    display : { base: "flex", md: "none" },
    borderBottom : "1px solid",
  };
  