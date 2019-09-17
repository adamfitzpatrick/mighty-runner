# mighty-runner

Web application for creating and managing Shadowrun Fifth Edition runners.

## Foundation of the Domain Object Model

### Stat

A **Stat** is the basic object which represents runner data that impacts game mechanics.  Simple values like a runner name, age, etc, are not considered Stats as they don't (usually) have an effect on gameplay.  However, the Agility attribute influences the dice pools a runner uses to resolve actions during play, and therefore qualifies as a Stat from the perspective of the DOM.

Stats incorporate several fields which describe them as well as a **value** property which dictates the Stat's impact on gameplay.  The specific components that make up a Stat's value vary among multiple different types of Stats, each of which is defined by extending the Stat interface.  Stats can also be influenced by **Effects**, and they can also carry one or more Effects that influence other Stats.

Note that the value field is further defined by the StatValue interface and provides a default baseline value provider for the stat.  This is done to facilitate cases in which there is a desire to track multiple value sources independently (such as an attribute's metatype starting value + the points spent on the attribute at chargen) while utilizing the sum to determine the overall Stat value.  Some Stats may extend the default value field with additional StatValue-typed fields to increase utility.

```typescript
interface Stat {
    id: string
    name: string
    shortName: string
    description: string
    asEffectTarget: string[]       // Used to determine which effects modify the stat (see below)
    effects: string[]              // List of effect ids which arise from the stat (see below)
    value: StatValue               // Default Stat baseline value provider
}

interface StatValue {
  [property: string]: number
}
```


### Effect

An **Effect** describes how one runner Stat can influence another.  For example, the muscle enhancement cyberware modifies a runner's agility attribute.  The cyberware would be entered as a **Gear** object which extends Stat.  An Effect would be added describing the effect that the cyberware has on the agility Stat, which a target that matches the **asEffectTarget** field in the Stat.  When the effective value of the agility Stat is calculated, it includes the value of the cyberware effect.  Effects can be marked as active or not to reflect equipment that can be turned off or destroyed as well as situational modifiers.  Additionally, Effects can target a specific field within the stat's value property or the overall value sum.

```typescript
{
    id: string
    name: string
    description: string
    target: string[]      // Determines what stat the effect modifies
    targetField?: string  // Determines the specific field in the target stat
    active: boolean
    value: number
}
```

### Pool

The **Pool** object is where the rubber hits the road for game mechanics.  When a runner wants to hit somebody with a weapon, they roll their agility stat + a stat representing their skill with the weapon, with a limit determined by the weapon itself.  A Pool is created to reflect this available action, and the stats which define the dice pool as well as the outcome of the action can be set in the pool using **PoolSources** (see below).

```typescript
{
    id: string
    name: string
    descript: string
    poolSources: string[]
    limitSources: string[]
    outcomeSources: string[]
    descriptiveOutcome: string
}
```

### PoolSource

A **PoolSource** describes how Stats and Effects work together to influence dice pools.

```typescript
{
    id: string
    target: string[]
    targetValueField?: string
}
```
