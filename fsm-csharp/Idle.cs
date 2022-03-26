using UnityEngine;

public class Idle : State
{
    float timer;
    public override void Enter(StateMachine manager)
    {
        Debug.Log("Entering Idle");   
        timer = 5f;
    }
    public override void Update(StateMachine manager)
    {
        timer -= Time.deltaTime;
        if (timer <= 0)
        {
            manager.SwitchState(manager.Wander);
        } else {
            Debug.Log("Idle");
        }
    }
}
