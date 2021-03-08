﻿namespace Api.Controllers
{
    using System;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Newtonsoft.Json.Linq;
    using Services.Abstractions;

    [ApiController]
    [Route("[controller]")]
    public class UserController : BaseController<User>
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
            : base(userService)
        {
            this._userService = userService ?? throw new ArgumentNullException(nameof(userService));
        }

        [HttpPut("update-theme/{id}/{theme}")]
        public async Task UpdateThemeAsync(string id, string theme)
        {
            if (string.IsNullOrEmpty(id))
            {
                throw new ArgumentNullException(nameof(id));
            }

            if (string.IsNullOrEmpty(theme))
            {
                throw new ArgumentNullException(nameof(theme));
            }

            await this._userService.UpdateThemeAsync(id, theme);
        }

        [HttpPost("login")]
        public async Task<LoggedInUser> LogInAsync(JObject model)
        {
            if (!model.ContainsKey("userId"))
            {
                throw new ArgumentNullException("userId");
            }

            if (!model.ContainsKey("password"))
            {
                throw new ArgumentNullException("password");
            }

            return await this._userService.LogInAsync(model["userId"].ToString(), model["password"].ToString());
        }
    }
}
