import { utilService } from '../util.service'

export const groupService = {
    getEmptyGroup,
    getGroupById,
}

function getEmptyGroup(groupTitle) {
    return {
      id: utilService.makeId(),
      title: groupTitle,
      archivedAt: Date.now(),
      tasks: [],
      style: {},
    }
  }

  function getGroupById(board, groupId) {
    return board.groups.find((group) => group.id === groupId)
  }