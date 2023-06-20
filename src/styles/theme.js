import { extendTheme } from "@chakra-ui/react";

const config = {
    initialColorMode: "light",
    useSystemColorMode: false,
  };

const colors = {
    blue: {
        800 : '#155e75',
        600 : '#0284c7',
        500 : '#06b6d4',
        400 : '#38bdf8',
        200 : '#a5f3fc',
        100 : '#bae6fd'
    },

    gray: {
        900 : '#18181b',
        800 : '#292524',
        600 : '#57534e',
        500 : '#a1a1aa',
        300 : '#d4d4d8',
        200 : '#e5e5e5',
        100 : '#f4f4f5'
    }
}

const styles = {
    global:(props) => (
        {
            'html,body' :{
                background : props.colorMode === 'dark' ? 'gray.800' : 'whiteAlpha.600'
            },
            h2: {
                color : props.colorMode === 'light' ? 'blue.800' : 'blue.200'
            },
            Button : {
                color : props.colorMode === 'light' ? 'whiteAlpha.600' : 'gray.800',
                background : props.colorMode === 'light' ? 'blue.800' : 'blue.200',
                fontSize : 'xl', 
                fontWeight : 'semibold',
                _hover : {
                    background : props.colorMode === 'light' ? 'blue.600' : 'blue.100',
                },
                _disabled_hover : {
                    background : 'unset'
                },
                borderColor :  props.colorMode === 'light' ? 'blue.800' : 'blue.200'
            },
            "*::placeholder": {
                color: props.colorMode === "light" ? "gray.500" : "whiteAlpha.600",
              }
        }
    )
}

const components = {
    Button : {
        baseStyle : {
            paddingY : '0.75rem',
            borderRadius : 'md',
            minWidth : '10'
        },
        variants : {
            solidPrimary : {
                height : 'auto',
                paddingX : '1.25rem'
            },
            outline : {
                background: "none"
            },
            link : {
                background: "transparent",
                _hover: {
                background: "transparent",
                textDecoration: "none"
                }
            }
        }
    }
}

const fonts = {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
};

export const theme = extendTheme({
    colors,config,components,styles,fonts
})