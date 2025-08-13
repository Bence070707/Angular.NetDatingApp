using System;
using System.Security.Claims;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace API.Extensions;

public static class ClaimsPrincipalExtensions
{
    public static string getMemberId(this ClaimsPrincipal user)
    {
        if (user == null) throw new ArgumentNullException(nameof(user));

        var memberIdClaim = user.FindFirstValue(ClaimTypes.NameIdentifier);
        if (memberIdClaim == null) throw new InvalidOperationException("User ID not found in claims");

        return memberIdClaim;
    }
}
