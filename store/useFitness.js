
import {create } from "zustand";
const usefitness  = create((set)=>({
    steps:0,
    dailygoal:10000,
    sessions:[],
    profileimage:null,
     calories: 0,
  distance: 0,
     
     setsteps:(steps)=> 
        set ({
            steps,
               calories: Number((steps * 0.04).toFixed(2)),
      distance: Number((steps * 0.0008).toFixed(2)),
        }), 

    addsessions:(sessions)=>
        set((State)=>({
            sessions:[...State.sessions, sessions]
        })),
    deletesessions:(id)=>
        set((state)=>({
            sessions:state.sessions.filter(
                (session)=> session.id !==id
            ),

        })),

    addprofileimage:(image)=>
        set({
            profileimage:image,
        })

})
)

export default usefitness;