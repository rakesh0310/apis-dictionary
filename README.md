# apis-dictionary
Apis for dictionary words 

To start the server:
  npm run dev

1.Users can Register and Login to application inorder to manage their API keys.
2.Users can get API keys with configurable Expiry dates. 


apihost:- localhost:port


Random word: {apihost}/words/randomWord?api_key={api_key}
Definiotns: {apihost}/word/{word}/definitions?api_key={api_key}
Examples: {apihost}/word/{word}/examples?api_key={api_key}
Related Words:{apihost}/word/{word}/relatedWords?api_key={api_key}
To check No. of Requests for each API: {apihost}/stats



