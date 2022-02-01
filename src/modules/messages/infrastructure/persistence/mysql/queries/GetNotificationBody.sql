select group_concat(data order by createdAt asc separator '\n') as body
from messages
where state = 1
    and destinationState in (1,2)
    and deviceFromId = ?
    and deviceFromType = ?
    and groupId = ?
    and groupType = ?
    and destinationId = ?
    and destinationType = ?
order by createdAt desc;