SELECT DISTINCT cargo.id, cargo.descripcion as name, 2 as type
FROM adm
    INNER JOIN cargo ON (cargo.id = adm.cargo)
WHERE
    adm.estado = 1
    and adm.cod_adm = ?