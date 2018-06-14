# bluejeans-api-create-meeting
An example of how to schedule a BlueJeans meeting using a client ID and secret.

# How to Use

1) Download auth.js, config.json, meeting.json, and createMeetingWithExternalFiles.js into the same folder.
2) Modify config.json so that client_id is your client ID and client_secret is your client secret. See the example below.
{
  "grant_type": "client_credentials",
  "client_id": "coolNewApp",
  "client_secret": "403o6c38jg94abfaui550asj31fede1"
}
3) Modify meeting.json so that whomever you'd like to invite is listed in the "email" key. 
4) In your command prompt, navigate to the folder which has all of these files and type "node createAMeetingWithExternalFiles.js param1 param2 param3" where param1, etc. are listed below. 

# Parameters
1) ID of the user for which the meeting will be scheduled
2) The start time of the meeting (in Unix time)
3) The duration of the meeting (in Unix time)

# How the Code Works
# step 1
Read the file containing your client ID and secret (config.JSON). Make sure this information is in JSON format.

# step 2
Stringify then parse the JSON data, and pass it as a parameter in our client authorization to obtain an access token. 

Method Name: 
Authentication via Client Grant Type

# step 3
Read the file containing your meeting details (meeting.json). Make sure this information is in JSON format. Note that the start time is an input parameter and the end time is calculated by adding the start time to the duration. The start time and end time are added to these details in the code before the post request is made. 

# step 4
Perform step 2 again, but this time with the data from the meeting.json file. 

Method Name: 
Create Meeting

# More Information
The link below contains information on all of the methods used in this code
https://bluejeans.github.io/api-rest-meetings/site/index.html

