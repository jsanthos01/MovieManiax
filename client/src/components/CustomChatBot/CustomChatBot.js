import React from 'react'
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

function CustomChatBot() {
  const config = {
    width: "300px",
    height: "400px",
    floating: true
  };

  const theme = {
    background: "white",
    fontFamily: 'Karla, sans-serif',
    headerBgColor: "#00B2B2",
    headerFontColor: "#fff",
    headerFontSize: "30px",
    botBubbleColor: "#00B2B2",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4c4c4c"
   };
  
   const steps = [
    {
      id: "Greet",
      message: "Hi! I'm ManiBot. Welcome to Movie Maniax!",
      trigger: "Ask Name"
    },
    {
      id: "Ask Name",
      message: "What is your name?",
      trigger: "Waiting user input for name"
    },
    {
      id: "Waiting user input for name",
      user: true,
      trigger: "Asking Options"
    },
    {
      id: "Asking Options",
      message: "Hi {previousValue}, select one of the following options that you would like to know more about.",
      trigger: "Displaying options for help"
    },
    {
       id: "Displaying options for help",
       options: [
          {
            value: "Features",
            label: "Features",
            trigger: "Asking about Features"
          },
          { 
            value: "Getting Started",
            label: "Getting Started",
            trigger: "Getting Started Steps"
          } 
        ]
    },
    {
       id: "Getting Started Steps",
       message: "Step 1: To be a Movie Maniax member, you need to sign up and then sign in to your account",
       trigger: "Step2"
    },
    {
       id: "Step2",
       message: "Step 2: Once logged in, your new adventure in Movie Maniax begins.",
       trigger: "Step3"
    },
    {
       id: "Step3",
       message: "Would you like me to walk through our cool features?",
       trigger: "Ask to show Features"
    },
    {
       id: "Ask to show Features",
       options: [
        {
          value: true,
          label: "Yes",
          trigger: "Asking about Features"
        },
        { 
          value: "false",
          label: "No",
          trigger: "Done"
        } 
      ]
    },
    {
       id: "Asking about Features",
       message: "There are five main features our app offers. Which one would you like to know more about?",
       trigger: "Feature Options"
    },
  {
      id: "Feature Options",
      options: [
        {
          value: "Watchlist",
          label: "Watchlist",
          trigger: "Asking about Watchlist"
        },
        {
          value: "Favourites",
          label: "Favourites",
          trigger: "Asking about Favourites"
        },
        {
          value: "Custom Tags",
          label: "Custom Tags",
          trigger: "Asking about Custom Tags"
        },
        {
          value: "Friendlist",
          label: "Friendlist",
          trigger: "Asking about Friendlist"
        }
      ]
    },
    
    {
       id: "Asking about Watchlist",
       message: "Once a movie has been searched, each of the movie cards has a bookmark icon that allows you to save the movie directly to your watchlist. Simply click on that icon to save your movie.",
       trigger: "Done"
    },
    {
       id: "Asking about Favourites",
       message: "Once a movie has been searched, each of the movie cards has a heart icon that allows you to save the movie directly to your watchlist. Simply click on that icon to save your movie.",
       trigger: "Done"
    },
    {
       id: "Asking about Custom Tags",
       message: "To organize your movies, simply add tags and view them inside 'Your Tags' Page.",
       trigger: "Done"
    },
    {
      id: "Done",
      message: "Have a great day !!",
      end: true
    }
];
  return(
    <ThemeProvider theme={theme}>
        <ChatBot steps={steps} {...config} />
    </ThemeProvider>
  );
}

export default CustomChatBot;
