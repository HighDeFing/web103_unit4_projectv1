# WEB103 Project 4 - *Name of App Here*

Submitted by: **Heider Delgado**

About this web app: **It's a web app that makes cars**

Time spent: **10** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->
- [X] **The web app is connected to a PostgreSQL database, with an appropriately structured `CustomCar` table**
  - [X] **NOTE: Your GIF must include a view of your Railway database that shows the contents of the table used by your app**
- [X] **The web app uses React to display data from the API**
- [X] **Users can view a list of options they can select for different aspects of a `CustomCar`**
- [X] **On selecting each option, the displayed visual icon for the `CustomCar` updates to match the option the user chose**
- [X] **The user can submit their choices to save the car to the list of created `CustomCar`**
- [] **If a user submits a feature combo that is impossible, they should receive an appropriate error message and the item should not be saved to the database**
- [X] **The app displays the total price of all features**
- [X] **Users can view a list of all submitted `CustomCar`**
- [X] **Users can edit or delete a submitted `CustomCar` from the list view of submitted `CustomCar`**
- [X] **Users can update or delete `CustomCar` that have been created from the detail page**

The following **optional** features are implemented:

- [ ] Selecting particular options prevents incompatible options from being selected even before form submission

The following **additional** features are implemented:

- [X] Added Pico CSS to improve how the model is seen.!

## Video Walkthrough

Here's a walkthrough of implemented required features:

![Walkthrough.gif](Walkthrough.gif)

GIF created with OBS GIF

## Notes

One of the challenges that made it hard was discovering than when checking === the type also has to be the same. Had a problem with strings and int. Also because my database model uses ids I had to fetch the data from the API to get the name and other properties of the feature.

Had to include a function to when reseting the database that fixes the id counter.

## License

Copyright [2024] [Heider Delgado]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.