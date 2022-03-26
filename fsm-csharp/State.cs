using UnityEngine;

public abstract class State
{
    public abstract void Enter(StateMachine manager);

    public abstract void Update(StateMachine manager);
}
