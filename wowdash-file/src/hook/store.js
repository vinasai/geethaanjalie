import {create} from 'zustand'

const useGroupStore = create((set) => ({
    groupId: null, // Store the group ID
    setGroupId: (id) => set({ groupId: id }), // Action to update the group ID
}));

const useEditGroupStore = create((set) => ({
    group: null,
    setGroupData: (groupData) => set({ group: groupData }), // Action to update the group ID

}))



export {useGroupStore,useEditGroupStore};