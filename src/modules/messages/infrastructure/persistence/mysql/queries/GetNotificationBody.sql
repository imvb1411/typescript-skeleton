select group_concat(data order by createdAt asc separator '\n') as body
from messages
where state = 1
    and destinationState = 1
    and destinationType = ?
    and destinationId = ?
order by createdAt desc;