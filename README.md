# bluejeans-api-create-meeting
An example of how to schedule a BlueJeans meeting using a client ID and secret. 

# Parameters
1) ID of the user for which the meeting will be scheduled
2) The start time of the meeting (in Unix time)
3) The duration of the meeting (in Unix time)

# step 1
Read the file containing your client ID and secret (config.JSON). Make sure this information is in JSON format.

# step 2
Stringify then parse the JSON data, and pass it as a parameter in our client authorization to obtain an accses token. 

# step 3
Read the file containing your meeting details (meeting.json). Make sure this information is in JSON format. Note that the start time is an input parameter and the end time is calculated by adding the start time to the duration. The start time and end time are added to these details in the code before the post request is made. 

# step 4

