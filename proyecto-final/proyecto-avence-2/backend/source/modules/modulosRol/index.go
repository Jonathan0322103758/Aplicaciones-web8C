package modulosRol

import (
	middleware "main/source/helpers/middlewares"
	"main/source/helpers/router"
	modulos_rol_service "main/source/modules/modulosRol/service"
)

func Init() {
	print("PermisosRol Module Initialized\n")
	InitRoutes()
}

func InitRoutes() {
	var r = router.NewRoute("/modulosRol")
	r.USE(middleware.JWTMiddleware())
	r.GET("/", modulos_rol_service.Service.Read)
	r.POST("/", modulos_rol_service.Service.Insert)
	// r.GET("/:id", modulos_rol_service.Service.ReadOne)
	r.PUT("/:id", modulos_rol_service.Service.Update)
	r.DELETE("/:id", modulos_rol_service.Service.Delete)
}
