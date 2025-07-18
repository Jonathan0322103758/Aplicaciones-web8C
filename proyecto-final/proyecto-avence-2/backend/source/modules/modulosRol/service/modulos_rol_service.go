package modulos_rol_service

import (
	"fmt"
	base_service "main/pkg/base/service"
	"main/source/modules/modulos"
	modulos_model "main/source/modules/modulos/model"
	modulos_rol_model "main/source/modules/modulosRol/model"
	"main/source/modules/roles"
	roles_model "main/source/modules/roles/model"
)

type ModulosRolService struct {
	base_service.Service[modulos_rol_model.ModulosRolStruct]
}

func (s *ModulosRolService) Read() ([]modulos_rol_model.ModulosRoleSanitizer, error) {
	var err error
	var rolesArr []roles_model.RolesStruct
	var modulosArr []modulos_model.ModulosStruct
	var relations []modulos_rol_model.ModulosRolStruct

	if rolesArr, err = roles.Service.Read(nil); err != nil || len(rolesArr) == 0 {
		return nil, fmt.Errorf("error al leer roles: %w", err)
	}

	if modulosArr, err = modulos.Service.Read(nil); err != nil || len(modulosArr) == 0 {
		return nil, fmt.Errorf("error al leer módulos: %w", err)
	}

	if relations, err = s.Service.Read(nil); err != nil || len(relations) == 0 {
		return nil, fmt.Errorf("error al leer relaciones módulo-rol: %w", err)
	}

	mapModulos := make(map[int]modulos_model.ModulosStruct)
	for _, modulo := range modulosArr {
		if modulo.Id != nil {
			mapModulos[*modulo.Id] = modulo
		}
	}

	mapRelations := make(map[int][]modulos_model.ModulosStruct)
	for _, relation := range relations {
		if modulo, exists := mapModulos[*relation.Permiso]; exists {
			modulo.Id = relation.Id
			mapRelations[*relation.Rol] = append(mapRelations[*relation.Rol], modulo)
		}
	}

	dataSanitizer := make([]modulos_rol_model.ModulosRoleSanitizer, 0, len(rolesArr))
	for _, role := range rolesArr {
		roleName := role.Nombre // para obtener dirección de una variable concreta
		dataSanitizer = append(dataSanitizer, modulos_rol_model.ModulosRoleSanitizer{
			Role:    &roleName,
			Modulos: mapRelations[*role.Id],
		})
	}

	return dataSanitizer, nil
}

var Service = base_service.NewService[ModulosRolService](*modulos_rol_model.Model)
