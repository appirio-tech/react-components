
# Submission

## Video

Note: The only code walk-through that is done is for the EditTrackPanel component that was created during this challenge. Other changes are spread across many other existing files; there wasn't much point of showing them in the video. 
The Git .patch file give an overview of changes. 

## Notes

- SideBarFilters 'Edit' button: 
In the sidebar, there is a discrepency between the SRM page and the Challenge page. In the SRM sidebar, 'Edit' is a blue link. In the Challenge sidebar, it is a gray button. I could have created two different UI component, but there is a Button component that should have been created in another challenge (https://www.topcoder.com/challenge-details/30056702/?type=develop), but isn't yet integrated in the challenge-listing branch. If 'Edit' ends up being a button, it should come from that component. 
For now, I decided to implement the link on both pages. 
