using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StateMachine : MonoBehaviour
{
    public State CurrentState;
    public Idle Idle = new Idle();
    public Wander Wander = new Wander();
    
    
    // Start is called before the first frame update
    void Start()
    {
        CurrentState = Idle;
        CurrentState.Enter(this);        
    }
    // Update is called once per frame
    void Update()
    {
        CurrentState.Update(this);
    }

    public void SwitchState(State newState)
    {
        CurrentState = newState;
        CurrentState.Enter(this);
    }
}
