using UnityEngine;

public class Wander : State
{   
    float timer;
    public override void Enter(StateMachine manager)
    {
        Debug.Log("Entering Wander");
        timer = 5f;
    }
    public override void Update(StateMachine manager)
    {
        timer -= Time.deltaTime;
        if (timer <= 0)
        {
            manager.SwitchState(manager.Idle);
        } else {
            Debug.Log("Wandering");
        }
    }

}
