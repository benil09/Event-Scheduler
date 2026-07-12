import { regenerateHostSlots as runSlotGeneration , RegenerateHostSlotInput } from "../../services/slot.service.js";



export async function regenerateHostSlotsActivity(input:RegenerateHostSlotInput){
    await runSlotGeneration(input);

    
}
    