# Woof Walker App

## Overview
Woof is an application for Dog Owners and Dog Lovers 🐶 Providing dog
walking services, foster care, booking for grooming appointments, finding products for pet care and treats! 

The app is to make dog walking services convient for dog owners who are
always on the go, but need their little pooch outside for their walk to
achieve their daily steps 🐕... or should I say daily paws 🐾

It would also include the Kingdom's finest forster care takers, groomers which the user may book an appointment with their shop through the app. A store displaying pet care items and treats. 

(due to the time constraint of the project deadline, I will only have the user, dog walker profile and the dog walker review models)

## Screenshots
![alt text](Screenshots/home%20page%20(sign%20up%20and%20login).png)
![alt text](Screenshots/sign%20up%20page.png)
![alt text](Screenshots/login%20page.png)
![alt text](Screenshots/Dog%20Owner%20Login.png)
![alt text](Screenshots/View%20Dogs%20page.png)
![alt text](Screenshots/Dog%20details%20page.png)
![alt text](Screenshots/add%20dogpage.png)
![alt text](Screenshots/Walk%20Request%20Page.png)
![alt text](Screenshots/Walk%20Request%20form%20Page.png)
![alt text](Screenshots/Dog%20Walker%20Homepage.png)
![alt text](Screenshots/Dog%20Walker%20Profile%20page.png)
![alt text](Screenshots/Dog%20Walker%20Walk%20Requests%20page.png)


## Technologies Used
1. EJS
2. CSS
3. Javascript
4. Node
5. MongoDB


## Getting Started



## User Stories
1. As a user, I want to create a profile for my dog to show their personality, age, size, requirements, description.

2. AAU, I want to sign-in and sign-out, view, update or delete the profile I created. (bonus) show the total overall distance walked.

3. AAU, I want to request for walking services and have trusted near by walkers available to walk my dog based on the requirements such as distance, duration, leash choice (if required), set scheduled timing and (bonus) track my dog.

4. AAU, I want to view the profiles of dog walkers and of the walker who accepts my walking request to see their ratings and reviews. ((bonus) have a badge system where the walkers may collect "badges" which are dogs they've walked and how far the walker and the user "dog" have walked together).

5. AAU, I want to leave a review on the walkers profile.


## Database Design



## Routes
### Profile Routes

| Method | Route                            | Description                    |

| GET    | `/userprofile/`                  | Displays the current user's profile. Dog owners see their dogs, while dog walkers see their walker profile. |

| GET    | `/userprofile/dog/:dogId`        | Displays the details of a specific dog belonging to the signed-in user.                                     |

| GET    | `/userprofile/dog/:dogId/edit`   | Displays the edit form for a specific dog.                                                                  |

| GET    | `/userprofile/edit`              | Displays the edit form for the signed-in dog walker.                                                        |

| PUT    | `/userprofile/dog/:dogId/edit`   | Updates the details of a specific dog belonging to the signed-in user.                                      |

| PUT    | `/userprofile/edit`              | Updates the signed-in dog walker's profile information.                                                     |

| DELETE | `/userprofile/delete`            | Soft-deletes the user's account and their associated profile/dogs, then destroys the session.               |

| DELETE | `/userprofile/dog/:dogId/delete` | Soft-deletes a specific dog belonging to the signed-in user.                                                |

| GET    | `/userprofile/add-dog`           | Displays the form for adding a new dog.                                                                     |

| POST   | `/userprofile/add-dog`           | Creates a new dog profile and associates it with the signed-in user.                                        |



### Walk Routes

| Method | Route                        | Description                        |

| GET    | `/walks/`                    | Displays the walk requests for the signed-in user. Dog owners see requests they created, while dog walkers see requests assigned to them. |

| GET    | `/walks/request`             | Displays the form for creating a new walk request, including the user's available dogs and available dog walkers.                         |

| POST   | `/walks/request`             | Creates a new walk request using the selected dogs, walker, duration, and signed-in user's ID.                                            |

| PUT    | `/walks/:requestId/accept`   | Allows the assigned dog walker to accept a pending walk request.                                                                          |

| PUT    | `/walks/:requestId/complete` | Allows the assigned dog walker to mark an accepted walk request as completed.                                                             |

| PUT    | `/walks/:requestId/cancel`   | Allows the dog owner or assigned dog walker to cancel a pending or accepted walk request.                                                 |

## Features


## Future Enhancements
There are many things I would love to add to the application
1. Live Tracking of the walk
2. Uber style notification request for walks
3. Specific time scheduled walk requests
4. in-app payment system
5. add features
6. add fostering services
7. pet stores



## Credits

1. Omar Kamal
2. w3school
3. Bootstrap
