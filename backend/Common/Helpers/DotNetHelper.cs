﻿namespace Common.Helpers
{
	using System;
	using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Linq;
    using Common.Models;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;

    public static class DotNetHelper
	{
		public static T1 Serialize<T, T1>(this T t)
			where T : class, new()
			where T1 : class, new()
		{
			return JsonConvert.DeserializeObject<T1>(JsonConvert.SerializeObject(t));
		}

		public static IEnumerable<List<T>> SplitList<T>(this List<T> locations, int nSize = 20)
		{
			for (int i = 0; i < locations.Count; i += nSize)
			{
				yield return locations.GetRange(i, Math.Min(nSize, locations.Count - i));
			}
		}

		public static T Clone<T>(this T t)
		{
			return JsonConvert.DeserializeObject<T>(JsonConvert.SerializeObject(t));
		}

		public static ICollection<T> FlattenList<T>(this ICollection<List<T>> list)
		{
			var flattenList = new List<T>();

			list.ToList()
				.ForEach(listItems =>
				{
					flattenList.AddRange(listItems);
				});

			return flattenList;
		}

		public static T DeepClone<T>(this T t)
			where T : class, new()
		{
			return DeepClone<T, T>(t);
		}

		public static TOut DeepClone<TIn, TOut>(this TIn tIn)
			where TIn : class, new()
			where TOut : class, new()
		{
			return JsonConvert.DeserializeObject<TOut>(JsonConvert.SerializeObject(tIn));
		}

		public static string FirstCharToUpper(this string input)
		{
			switch (input)
			{
				case null: throw new ArgumentNullException(nameof(input));
				case "": throw new ArgumentException($"{nameof(input)} cannot be empty", nameof(input));
				default: return input.First().ToString().ToUpper() + input.Substring(1);
			}
		}

		public static T Merge<T>(this T t, T t1)
			where T : class, new()
		{
			var tDocument = JObject.FromObject(t);
			var t1Document = JObject.FromObject(t1);

			foreach (var keyValue in t1Document)
			{
				tDocument[keyValue.Key] = keyValue.Value;
			}

			return tDocument.ToObject<T>();
		}

		public static Collection<T> ToCollection<T>(this List<T> items)
		{
			Collection<T> collection = new Collection<T>();

			for (int i = 0; i < items.Count; i++)
			{
				collection.Add(items[i]);
			}

			return collection;
		}

		public static ResponseItemCollection<T> ToResponse<T>(this List<T> items)
		{
			var responseItemCollection = new ResponseItemCollection<T>();
			for (int i = 0; i < items.Count; i++)
			{
				responseItemCollection.Add(items[i]);
			}
			return responseItemCollection;
		}
	}
}
